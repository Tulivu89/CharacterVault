"""Age-gate tests for vault.py. Standard library only.

Run from the vault root:  python3 -m unittest discover tests

Each test builds a throwaway vault in a temp folder (the script, the
templates and a few notes), so your own notes are never touched.
"""
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]


class AgeGate(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root / ".claude/scripts").mkdir(parents=True)
        shutil.copy(REPO / ".claude/scripts/vault.py", self.root / ".claude/scripts/vault.py")
        shutil.copytree(REPO / "Templates", self.root / "Templates")
        self.vault("new", "character", "Test Subject")

    def tearDown(self):
        self.tmp.cleanup()

    def vault(self, *args, check=True):
        r = subprocess.run([sys.executable, str(self.root / ".claude/scripts/vault.py"), *args],
                           capture_output=True, text=True)
        if check and r.returncode != 0:
            self.fail(f"vault.py {' '.join(args)} failed: {r.stdout}{r.stderr}")
        return r

    def note(self, rel):
        return self.root / rel

    def profile(self, name, stage, age):
        self.vault("new", "roleplay", name, "--character", "Test Subject")
        p = self.note(f"Characters/Test Subject/Test Subject - {name}.md")
        p.write_text(p.read_text()
                     .replace("stage: adult", f"stage: {stage}", 1)
                     .replace("age:\n", f'age: "{age}"\n', 1))
        return p

    def write_adult(self, profile_name, stage="adult"):
        """Hand-write an adult file, the way a user could bypass `new`."""
        p = self.note(f"Characters/Test Subject/Test Subject - {profile_name} - Adult.md")
        p.write_text("---\ntype: adult\ncharacter: \"[[Test Subject]]\"\n"
                     f"profile: \"[[Test Subject - {profile_name}]]\"\nstage: {stage}\n---\n# x\n")
        return p

    # --- `new` refuses ---

    def test_new_adult_refused_for_child_profile(self):
        self.profile("Young", "child", "9")
        r = self.vault("new", "adult", "x", "--character", "Test Subject",
                       "--profile", "Test Subject - Young", check=False)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("Refused", r.stdout + r.stderr)

    def test_new_adult_refused_for_teen_profile(self):
        self.profile("Cadet", "teen", "16")
        r = self.vault("new", "adult", "x", "--character", "Test Subject",
                       "--profile", "Test Subject - Cadet", check=False)
        self.assertNotEqual(r.returncode, 0)

    def test_new_adult_allowed_for_adult_and_elder(self):
        for name, stage, age in (("Grown", "adult", "24"), ("Old", "elder", "60")):
            self.profile(name, stage, age)
            self.vault("new", "adult", "x", "--character", "Test Subject", "--profile", f"Test Subject - {name}")

    # --- `show` refuses ---

    def test_show_refuses_adult_file_on_teen_profile(self):
        self.profile("Cadet", "teen", "16")
        self.write_adult("Cadet")
        r = self.vault("show", "Test Subject - Cadet - Adult", check=False)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("Refused", r.stdout + r.stderr)

    def test_show_refuses_under_18_age_even_with_adult_stage(self):
        self.profile("Mislabeled", "adult", "17")
        self.write_adult("Mislabeled")
        r = self.vault("show", "Test Subject - Mislabeled - Adult", check=False)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("under 18", r.stdout + r.stderr)

    def test_show_refuses_under_18_body_age(self):
        p = self.profile("Vessel", "adult", "300")
        p.write_text(p.read_text().replace("body_age:\n", 'body_age: "12"\n', 1))
        self.write_adult("Vessel")
        r = self.vault("show", "Test Subject - Vessel - Adult", check=False)
        self.assertNotEqual(r.returncode, 0)

    def test_show_allows_valid_adult_file(self):
        self.profile("Grown", "adult", "24")
        self.write_adult("Grown")
        self.vault("show", "Test Subject - Grown - Adult")

    # --- `lint` and `cast` ---

    def test_lint_errors_on_broken_vault(self):
        self.profile("Cadet", "teen", "16")
        self.write_adult("Cadet")
        r = self.vault("lint", check=False)
        self.assertEqual(r.returncode, 1)
        self.assertIn("ERROR", r.stdout)

    def test_lint_errors_on_non_sfw_teen_profile(self):
        p = self.profile("Cadet", "teen", "16")
        p.write_text(p.read_text().replace("rating: sfw", "rating: explicit", 1))
        self.assertEqual(self.vault("lint", check=False).returncode, 1)

    def test_cast_marks_teen_version_non_sexual(self):
        self.profile("Cadet", "teen", "16")
        self.vault("new", "story", "Test Story")
        s = self.note("Stories/Test Story.md")
        s.write_text(s.read_text()
                     .replace("cast: []", 'cast: ["[[Test Subject]]"]', 1)
                     .replace("profiles: []", 'profiles: ["[[Test Subject - Cadet]]"]', 1))
        out = self.vault("cast", "Test Story").stdout
        self.assertIn("non-sexual role", out)
        self.assertNotIn("adult file:", out)

    def test_shipped_vault_lints_clean(self):
        r = subprocess.run([sys.executable, str(REPO / ".claude/scripts/vault.py"), "lint"],
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout)


if __name__ == "__main__":
    unittest.main()

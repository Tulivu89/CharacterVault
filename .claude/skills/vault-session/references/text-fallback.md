# Saving story text by hand

Read this only when `vault.py save` shows the text is behind the conversation or missing: hooks are off, the session didn't start through vault-session, or the vault runs somewhere without the Stop hook.

1. Find the story replies after the `Last captured` beat (all of them if there's no text yet).
2. Append each one, oldest first, exactly as it appears in this conversation, without its [bracketed] notes:

   ```bash
   python3 .claude/scripts/vault.py text "<story>" <<'EOF'
   <the reply, word for word>
   EOF
   ```

   In PLAY or CO-WRITE, append the user's own passage before the reply it led to, with `--you`.
3. Run `vault.py commit "Text: <story>"`.
4. Replies no longer in this conversation (lost to compaction or an earlier session) can't be recovered from here. Name the gap in the save report. In a cloud session, an archived session's transcript still holds them; the user can copy them from there.

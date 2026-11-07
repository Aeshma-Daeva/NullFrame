NULLFRAME USB JOIN — PREREQUISITES PREVIEW

Extract the entire ZIP, then double-click Join-NullFrame.exe.
Keep bundle.json beside it. The launcher verifies the small files and stages itself
under your private local application-data NullFrameNode folder. Python is included
inside the executable; no Python installation is needed on the target PC.

WHAT HAPPENS
- Reuse connected Tailscale; otherwise prepare the official, checksum-verified,
  publisher-signature-checked Tailscale MSI. Windows may request administrator approval.
- Reuse healthy local Ollama with qwen3.5:0.8b.
- If needed, prepare the pinned standalone Ollama runtime and verified seed model in
  the private NullFrameNode folder. The managed API binds only 127.0.0.1:11435.
  Existing installations, model stores and occupied listeners are preserved.
- Reuse the same encrypted identity, inventory, exact-model grants, claims and receipts.

FIRST RUN
1. Launch the executable on a PC you are authorized to enroll.
2. Type JOIN. Keep the USB connected while prerequisites are being prepared.
3. If Tailscale is newly installed, open Start > Tailscale and sign in to the lab's network
   once, then reopen this launcher. Installation may require Windows approval.
4. For a new node, enter a fresh one-use NODE invitation at the hidden prompt.
   Do not enter an owner dashboard key or Tailscale key.
5. The hub owner grants qwen3.5:0.8b for this node. Existing granted nodes keep their grant.
6. Keep the window open for this session. Ctrl+C stops it. No automatic startup is set.

THE TWO PACKAGES
Small online package: downloads missing prerequisites from pinned official sources.
Full offline-assets package: includes the prerequisites/ folder, about 2.98 GB.
Both require connectivity for Tailscale authentication, hub enrollment and jobs.
The full package's model/runtime preparation works without downloading those assets.
Allow approximately 10 GB free SSD space for cache, extraction, model store and headroom.
Verified cache files survive a failed run. Reopen to resume interrupted downloads.
Leave prerequisites/ beside the launcher, or supply --media with its absolute path.
Once preparation is complete, reopening the staged local executable needs no USB.

WHAT THIS DOES NOT YET PROVIDE
An installer-AI is not active. Setup uses deterministic validated actions.
No reusable network secret, owner credential or node credential is included on USB.
Fresh Tailscale sign-in and per-device hub approval remain explicit.
This preview does not install GPU drivers, bypass Windows protections or configure startup.
Pinokio, MeshCentral and WinGet are not required.

QUALIFICATION AND LIMITS
Windows11 x64 native VM checks use a SYSTEM account and CPU inference.
Normal-user UAC, actual NVIDIA GPU use, SmartScreen/AV, physical USB removal, reboot
and continuous unattended operation still require field acceptance.
A checksum does not constitute a digital signature for this unsigned launcher.
If Windows blocks execution, keep its protections enabled and inspect the report.

RECOVERY
Pending completed receipts are uploaded before local model preparation.
Unknown in-flight outcomes remain uncertain and require hub inspection.
Do not delete private profiles or retry an uncertain installer blindly.
Only runtime processes started by this launcher are stopped when its session closes.
Pre-existing Ollama/Tailscale installations are not uninstalled.
Private files and Ollama logs remain under the current account's NullFrameNode folder.

THIRD-PARTY MATERIALS
Full assets are unmodified upstream archives/installers and model objects.
Their provenance, sizes and SHA256 digests are in BUILD.json.
Upstream runtime archive license files, the model's license layer and MSI's license
materials remain included; their respective terms apply.
Ollama: https://github.com/ollama/ollama
Tailscale: https://tailscale.com
Qwen: https://ollama.com/library/qwen3.5

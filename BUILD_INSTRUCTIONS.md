# Build Instructions (Docker)

To build this project in a consistent environment, we use the `dev-env-image:latest` Docker image.

## Prerequisites

- Docker installed and running.
- `dev-env-image:latest` available locally.

## Build Command

Run the following command in the project root to install dependencies, build the source, and generate `.deb` / `.rpm` packages:

```bash
docker run --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  dev-env-image:latest \
  bash -c "export DEBIAN_FRONTEND=noninteractive && \
  apt-get update && \
  apt-get install -y curl build-essential git rpm fakeroot dpkg pkg-config libsecret-1-dev && \
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get install -y nodejs && \
  npm ci && \
  npm run make"
```

## Output

Artifacts will be generated in `out/make/`:

- **DEB**: `out/make/deb/x64/`
- **RPM**: `out/make/rpm/x64/`

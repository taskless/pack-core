# Taskless Packs: Core (Status, Duration, and Failure Detection)

> Taskless Packs are plugins that enable service-specific functionality in Taskless. To use this pack, you need to install it into your Taskless instance using either the [Taskless CLI](https://github.com/taskless/pack) or the [Taskless Cloud](https://www.taskless.io) interface.

# Pack Overview

This pack replicates traditional APM functionality found in traditional APM tools, but with flexibility to customize the domains and endpoints that you want to monitor. It provides the following features:

# Installation

You can install this pack via Taskless Cloud, or via the Taskless CLI using the `pack.tgz` from the releases page.

```bash
# Taskless CLI
pnpm dlx @taskless/pack@latest install "<url/to/pack.tgz>"
```

# Configuration

This pack has a variety of configuration options, with defaults for the most common use cases.

# FAQs

- **What does this pack send?** This pack sends metadata about the status, duration, and failure of tasks. This includes the requested URL, the response code, the duration of the request, and a good-faith attempt to extract error data from some of the most common error formats (JSON via `.errors`, etc)

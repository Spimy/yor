# Yor CLI

## Installation

```bash
npm install -g @yor/cli
or
yarn add global @yor/cli
```

## Commands

The CLI works in 2 different ways. One is to just type out all the information and the second is interactive.

### First way

1. Create new project:

```bash
yor --new <project-name>
or
yor -n <project-name>
```

2. Generate new command:

```bash
yor --command <command-name>
or
yor -c <command-name>
```

3. Generate new event:

```bash
yor --event <event-name>
or
yor -e <event-name>
```

There is no validation for the event name. It can be named anything so when you go into the file itself, you may need to change the event yourself.

### Second way

This is the interactive way. If you do not provide any options, you will be immediately greeted interactively. Simply running `yor` is enough.

![Interactive CLI Preview](https://raw.githubusercontent.com/Spimy/yor/main/packages/cli/assets/interactive-cli.png)

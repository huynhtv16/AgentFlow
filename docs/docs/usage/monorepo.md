# Work with an Existing Mono Repo using AgentFlow

AgentFlow is good at handling complex monorepo projects. For example, if you you have an app set up like this:

```
app/
web/
backend/
```

You can run AgentFlow at the top level and give it commands like this:

```
agentflow -m "Update the user form to support birthdates. Be sure to also update the DB model and migration scripts."
```

AgentFlow will proceed to work on multiple high-level components of your application.
## To generate the schema from prisma graphql API:
1. ```npm install -g get-graphql-schema```

2. add to package.json:
```
"get-schema": "get-graphql-schema http://localhost:4466 > src/generated/prisma.graphql"
```

3. ```npm run get-schema```

OR you can download Schema straight from Prisma GraphQL playground on localhost

---

```docker-compose config```

to check the docker-compose.yml file inside prisma folder if it has all values from .env

---

## Deleting data on relational DB

- SET_NULL
- CASCADE

On datamodel.graphql file
```
@relation(name: [relation name OR get name from postgreSQL relations], onDelete: [CASCADE or SET_NULL])
```
---


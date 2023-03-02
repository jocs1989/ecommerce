import { readFileSync } from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'url';

import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from '../resolvers/resolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, "schema.graphql");

const typeDefs = readFileSync(schemaPath, "UTF-8");

export const schema = makeExecutableSchema ({typeDefs,resolvers} );

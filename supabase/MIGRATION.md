# Supabase Schema Migration

## Problema
A coluna `guest_slug` não existe na tabela `rsvp` do Supabase.

## Solução

### Opção 1: Executar via Supabase Dashboard (Recomendado)

1. Acesse https://supabase.com/dashboard
2. Escolha seu projeto (evgonrpyrawehqsmdxyr)
3. Vá para **SQL Editor**
4. Clique em **New Query**
5. Copie e cole o conteúdo de `supabase/schema.sql`
6. Clique em **Run**

### Opção 2: Usar Script (Automático)

Se você tem Node.js com suporte a ES modules:

```bash
npm run migrate:schema
```

Este script está em `scripts/apply-schema-migration.mjs`.

## Estrutura da Tabela RSVP

Após a migração, a tabela `rsvp` terá as seguintes colunas:

```
id              UUID (primary key)
name            TEXT
attending       BOOLEAN
message         TEXT
guest_slug      TEXT (opcional)
created_at      TIMESTAMPTZ
```

## Status Atual

O aplicativo já possui um fallback para trabalhar sem a coluna `guest_slug`:
- Se a coluna não existir, as queries selecionam apenas os campos disponíveis
- As funcionalidades principais (RSVP, Mensagens) funcionam normalmente
- A coluna `guest_slug` será usada quando disponível para vincular RSVPs aos convites

## Próximas Etapas

1. ✅ Execute a migração do schema (via SQL Editor ou script)
2. ✅ O app começará a usar `guest_slug` automaticamente
3. ✅ Novas funcionalidades de Photo Booth estarão disponíveis

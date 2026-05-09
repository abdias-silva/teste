# Site NEPA — Sistema de Edição via Planilha

Esse é o **resumo prático** de como o site funciona agora. Para o guia visual completo, abra o arquivo `GUIA-EDICAO.html` no navegador.

## A regra de ouro

> **Você só edita `database.xlsx`. Nunca mais precisa mexer em HTML.**

## Como atualizar o site (5 passos)

1. Baixe o `database.xlsx` do servidor
2. Abra no Excel
3. Edite a aba que precisa
4. Salve (mantendo o nome `database.xlsx`)
5. Suba o arquivo no servidor (mesma pasta dos HTMLs)

Pronto. O site se atualiza sozinho quando alguém recarregar a página.

## O que cada arquivo faz

```
database.xlsx              ← Você edita só este
nepa-data.js               ← Carrega a planilha (não mexer)
GUIA-EDICAO.html           ← Manual completo (abrir no navegador)

index.html                 ← Página inicial
biblioteca.html            ← Lista de publicações
pesquisas.html             ← Lista de projetos de pesquisa
pesquisa-detalhe.html      ← Detalhes de cada projeto (abre via ?id=N)
membros.html               ← Equipe do NEPA
publicacao.html            ← Detalhes de cada publicação (já existia)
style.css                  ← Estilos visuais (não mexer)
```

## Abas do database.xlsx

| Aba | O que controla |
|-----|----------------|
| `_INSTRUCOES` | Guia rápido (não mexer) |
| `publicacoes` | Biblioteca digital |
| `projetos` | Projetos de pesquisa |
| `linhas_pesquisa` | Linhas temáticas |
| `membros` | Equipe |
| `eventos` | Eventos da home |
| `parceiros` | Logos institucionais |
| `documentarios` | Documentários |
| `slides_home` | Banner principal |
| `config` | Textos gerais (e-mail, endereço, estatísticas) |

## Dica importante

Antes de subir uma versão nova da planilha, **faça um backup** da versão antiga (renomeie para `database-2025-05-09.xlsx` por exemplo). Assim, se algo der errado, é só restaurar o backup.

## Em caso de dúvida

Veja o **GUIA-EDICAO.html** — ele tem todos os detalhes de cada aba, exemplos de preenchimento e solução de problemas comuns.

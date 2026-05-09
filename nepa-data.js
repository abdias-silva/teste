/* =============================================================
   NEPA — Sistema de carregamento de dados
   Lê todas as abas de database.xlsx e disponibiliza globalmente.
   ============================================================= */

window.NepaDB = {
  // Cache de dados de cada aba
  data: {},

  /**
   * Carrega o database.xlsx e converte cada aba em array de objetos.
   * Faz cache: chama múltiplas vezes não recarrega o arquivo.
   * @param {string[]} sheets - lista de abas a carregar (vazio = todas)
   */
  async load(sheets = null) {
    if (this._loaded) {
      return this.data;
    }
    try {
      const resp = await fetch('database.xlsx');
      if (!resp.ok) throw new Error('database.xlsx não encontrado em ' + resp.url);
      const buf = await resp.arrayBuffer();
      const wb  = XLSX.read(buf, { type: 'buffer' });

      const target = sheets || wb.SheetNames;
      target.forEach(name => {
        if (wb.Sheets[name]) {
          this.data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' });
        }
      });
      this._loaded = true;
      return this.data;
    } catch (err) {
      console.error('[NepaDB] Erro ao carregar database.xlsx:', err);
      throw err;
    }
  },

  /**
   * Helper: pega uma aba específica (depois de load).
   */
  sheet(name) {
    return this.data[name] || [];
  },

  /**
   * Helper: pega um valor da aba "config" pela chave.
   */
  config(key, fallback = '') {
    const c = (this.data.config || []).find(r => r.chave === key);
    return c ? (c.valor || fallback) : fallback;
  },

  /**
   * Helper: encontra um item por id em uma aba.
   */
  findById(sheetName, id) {
    const sheet = this.data[sheetName] || [];
    return sheet.find(r => String(r.id) === String(id));
  },

  /**
   * Helper: filtra linhas com truthy em uma coluna boolean (1, "1", "TRUE", true).
   */
  isTruthy(v) {
    return v === true || v === 1 || v === '1' || (typeof v === 'string' && v.toUpperCase() === 'TRUE');
  },

  /**
   * Helper: parse de campos compostos com "|" e ";".
   * Ex: "João|Coordenador; Ana|Pesquisadora"
   *  → [{0: "João", 1: "Coordenador"}, {0: "Ana", 1: "Pesquisadora"}]
   */
  parseCompound(str, fieldNames = []) {
    if (!str) return [];
    return String(str).split(';').map(item => {
      const parts = item.split('|').map(s => s.trim());
      const obj = {};
      parts.forEach((p, i) => { obj[fieldNames[i] || i] = p; });
      return obj;
    }).filter(o => Object.values(o).some(v => v));
  },

  /**
   * Helper: parse de listas separadas por vírgula.
   */
  parseList(str) {
    if (!str) return [];
    return String(str).split(',').map(s => s.trim()).filter(Boolean);
  },

  /**
   * Helper: parse de objetivos/itens separados por nova linha.
   */
  parseLines(str) {
    if (!str) return [];
    return String(str).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  },
};

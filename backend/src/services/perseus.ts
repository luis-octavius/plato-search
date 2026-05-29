/**
 * PerseusService integrates with Perseus Digital Library via CTS API
 * to retrieve Platonic texts in Greek and English translations.
 *
 * Reference: https://www.perseus.tufts.edu/hopper/
 */

export interface PassageSearchResult {
  reference: string; // e.g., "República 7.514a"
  greek: string; // Original Greek text
  english: string; // Jowett English translation
  dialogueCode: string; // e.g., "republic"
}

export class PerseusService {
  private readonly ctsApiBase = 'https://scaife.perseus.org/api/cts';

  /**
   * Dialogue URN mappings for Perseus CTS API
   * Maps Portuguese dialogue names to CTS URN prefixes
   */
  private dialogueUrns: Record<string, string> = {
    apology: 'urn:cts:greekLit:tlg0030.tlg002',
    crito: 'urn:cts:greekLit:tlg0030.tlg003',
    euthyphro: 'urn:cts:greekLit:tlg0030.tlg004',
    gorgias: 'urn:cts:greekLit:tlg0030.tlg006',
    hippias_major: 'urn:cts:greekLit:tlg0030.tlg008',
    hippias_minor: 'urn:cts:greekLit:tlg0030.tlg009',
    ion: 'urn:cts:greekLit:tlg0030.tlg010',
    laches: 'urn:cts:greekLit:tlg0030.tlg013',
    lysis: 'urn:cts:greekLit:tlg0030.tlg014',
    meno: 'urn:cts:greekLit:tlg0030.tlg016',
    phaedo: 'urn:cts:greekLit:tlg0030.tlg020',
    phaedrus: 'urn:cts:greekLit:tlg0030.tlg021',
    philebus: 'urn:cts:greekLit:tlg0030.tlg022',
    protagoras: 'urn:cts:greekLit:tlg0030.tlg024',
    republic: 'urn:cts:greekLit:tlg0030.tlg025',
    sophist: 'urn:cts:greekLit:tlg0030.tlg026',
    statesman: 'urn:cts:greekLit:tlg0030.tlg027',
    symposium: 'urn:cts:greekLit:tlg0030.tlg029',
    theaetetus: 'urn:cts:greekLit:tlg0030.tlg031',
    timaeus: 'urn:cts:greekLit:tlg0030.tlg032',
  };

  /**
   * Translation URN for Jowett's English translation
   */
  private readonly jowettUrn = 'urn:cts:greekLit:tlg0030.tlg025.perseus-eng3';

  /**
   * Searches for a passage in Perseus Digital Library
   * @param dialogue - Dialogue name (e.g., 'republic', 'apology')
   * @param stephanus - Stephanus reference (e.g., '7.514a')
   * @returns PassageSearchResult with Greek and English text
   */
  async searchPassage(dialogue: string, stephanus: string): Promise<PassageSearchResult> {
    try {
      const dialogueUrn = this.dialogueUrns[dialogue.toLowerCase()];
      if (!dialogueUrn) {
        throw new Error(`Unknown dialogue: ${dialogue}. Valid options: ${Object.keys(this.dialogueUrns).join(', ')}`);
      }

      // Normalize Stephanus reference (remove spaces, ensure lowercase)
      const normalizedRef = stephanus.toLowerCase().replace(/\s+/g, '');

      // Fetch Greek text
      const greekUrn = `${dialogueUrn}:${normalizedRef}`;
      const greekText = await this.fetchPassage(greekUrn);

      // Fetch English translation (Jowett)
      // Note: In real scenario, you'd match the translation to the same reference
      const englishText = await this.fetchPassage(`${this.jowettUrn}:${normalizedRef}`)
        .catch(() => '[English translation not available]');

      const referenceName = this.formatReference(dialogue, stephanus);

      return {
        reference: referenceName,
        greek: greekText,
        english: englishText,
        dialogueCode: dialogue.toLowerCase(),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Perseus search error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Fetches a passage from Perseus CTS API
   * @param urn - Complete URN (including dialogue and reference)
   * @returns Passage text
   */
  private async fetchPassage(urn: string): Promise<string> {
    try {
      const url = new URL(`${this.ctsApiBase}/passages/`);
      url.searchParams.append('urn', urn);
      url.searchParams.append('format', 'json');

      const response = await fetch(url.toString());

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Passage not found: ${urn}`);
        }
        throw new Error(`CTS API error: ${response.status}`);
      }

      const data = await response.json() as { passage?: string; text?: string };
      return (data.passage || data.text || '').trim();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch passage ${urn}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Formats a reference name from dialogue and Stephanus ref
   * e.g., 'república', '7.514a' → 'República 7.514a'
   */
  private formatReference(dialogue: string, stephanus: string): string {
    const dialogueNames: Record<string, string> = {
      apology: 'Apologia',
      crito: 'Críton',
      euthyphro: 'Eutífron',
      gorgias: 'Górgias',
      hippias_major: 'Hípias Maior',
      hippias_minor: 'Hípias Menor',
      ion: 'Íon',
      laches: 'Láques',
      lysis: 'Lísis',
      meno: 'Mênon',
      phaedo: 'Fédon',
      phaedrus: 'Fedro',
      philebus: 'Filebo',
      protagoras: 'Protágoras',
      republic: 'República',
      sophist: 'Sofista',
      statesman: 'Político',
      symposium: 'Banquete',
      theaetetus: 'Teeteto',
      timaeus: 'Timeu',
    };

    const dialogueName = dialogueNames[dialogue.toLowerCase()] || dialogue;
    return `${dialogueName} ${stephanus}`;
  }

  /**
   * Lists all available dialogues
   */
  listAvailableDialogues(): string[] {
    return Object.keys(this.dialogueUrns).sort();
  }
}

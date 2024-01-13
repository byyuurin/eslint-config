export type VendoredDprintOptions = Partial<VendoredDprintOptionsRequired>

export interface VendoredDprintOptionsRequired {
  /**
   * You may want to publish your own opinionated configuration and
   * disallow anyone using it from overriding the properties.
   *
   * This can be done by adding a "locked": true property to
   * each plugin configuration you wish to lock.
   *
   * Note: When doing this, ensure you set all the global configuration values
   * if you wish to enforce those.
   */
  locked: boolean
  /**
   * The width of a line the formatter will try to stay under.
   * Note that this limit will be exceeded in certain cases.
   */
  lineWidth: number
  /**
   * Whether to use tabs (true) or spaces (false).
   */
  useTabs: boolean
  /**
   * This applies to both JavaScript & TypeScript
   */
  quoteStyle: 'preferSingle' | 'preferDouble'
  /**
   * The number of spaces for an indent when using spaces or
   * the number of characters to treat an indent as when using tabs.
   */
  indentWidth: number
  /**
   * The kind of newline to use.
   * - `auto` - For each file, uses the newline kind found at the end of the last line.
   * - `crlf` - Uses carriage return, line feed.
   * - `lf` - Uses line feed.
   * - `system` - Uses the system standard (ex. crlf on Windows).
   */
  newLineKind: 'auto' | 'crlf' | 'lf' | 'system'
}

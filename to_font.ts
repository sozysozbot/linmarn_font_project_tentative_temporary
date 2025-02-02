import { generateFonts, FontAssetType, OtherAssetType } from 'fantasticon';
import * as fs from 'fs';
// import * as fs_extra from 'fs-extra'
(async function() {
const fix_path = "rounded_fixed"
const out_path = "fonts_rounded"
const glyph_map: { [key: string]: number } = {};
const files = fs.readdirSync(`${fix_path}/`);
files.forEach((file, index) => {
  if (file.slice(-4) !== ".svg") return;
  glyph_map[file[0]] = file.charCodeAt(0);
  console.log(file[0], file.charCodeAt(0).toString(16))

 /* const svg_path = `${fix_path}/${file}`;
  const svg_glyph = fs.readFileSync(svg_path, 'utf-8').replace("0 0 136 120", `0 0 600 ${600/136*120}`);
  fs.writeFileSync(svg_path, svg_glyph, 'utf-8');*/
});
generateFonts({
  inputDir: `${fix_path}/`,
  outputDir: `${out_path}/`,
  name: "linzklar_rounded",
  fontTypes: [FontAssetType.TTF, FontAssetType.WOFF],
  assetTypes: [
    OtherAssetType.CSS,
    OtherAssetType.HTML,
    OtherAssetType.JSON,
   /* OtherAssetType.TS */ // The TS asset is buggy; remove
  ],
  fontHeight: 480,
  codepoints: glyph_map
}).then(results => {
  console.log(results);
  // copy the resulting fonts into docs/
  // fs_extra.copy("fonts", "docs/fonts");
});
})();

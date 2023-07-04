import path from 'path';
import getDirectories from './helpers/index.js'

const dirname = path.dirname('');
const tokens = getDirectories(path.join(dirname, 'tokens'));


export default {
  "source": ["tokens/**/*.tokens.json"],
  "platforms": {
    // render tokens in specific folders based on tokens subdirectories
    // "css": {
    //   "transformGroup": "css",
    //   "buildPath": "dist/",
    //   "files": tokens.map((token) => {
    //     // remove core tokens from build
    //     if (token === 'core') return

    //     return {
    //       "destination": `${token}/token.css`,
    //       "format": "css/variables",
    //       "filter": "removeCoreTokens",
    //     }
    //   })
    // }

    // filter tokens en return all tokens except core tokens
    // "css": {
    //   "transformGroup": "css",
    //   "buildPath": "dist/",
    //   "files": [{
    //     "destination": `token.css`,
    //     "format": "css/variables",
    //     "filter": "removeCoreTokens",
    //   }]
    // }
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "prefix": "wl",
      "files": [
        {
          "destination": `tokens.css`,
          "format": "css/variables",
          "options": {
            "outputReferences": true,
          },
        },
        {
          destination: `dark.tokens.css`,
          "format": "css/variables/dark",
          "filter": "theme/dark",
        }
      ]
    }
  }
}

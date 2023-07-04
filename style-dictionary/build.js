import StyleDictionary from 'style-dictionary';
import config from './config.js';

console.log('\nBuild started...');

StyleDictionary.registerFilter({
  name: 'removeCoreTokens',
  matcher: function(props) {
    const isCore = props.filePath.includes('core');
    return !isCore;
  }
})

StyleDictionary.registerFilter({
  name: 'isComponents',
  matcher: function(props) {
    return props.filePath.includes('components');
  }
});

StyleDictionary.registerFilter({
  name: 'theme/dark',
  matcher: function(props) {
    return props.darkValue || props.filePath.includes('components');
  }
})

StyleDictionary.registerFormat({
  name: "css/variables/dark",
  formatter: function({dictionary}) {
    
    const componentTokens = dictionary.allProperties.filter((props) => {
      return props.filePath.includes('components');
    }).map((props) => {
      let value = props.value;

      if (dictionary.usesReference(props.original.value)) {
        const refs = dictionary.getReferences(props.original.value);
        refs.forEach((ref) => {
          value = value.replace(ref.value, () => {
            return `${ref.name}`
          });
        });
      }
      return `  --${props.name}: var(--${value});`
    }).join('\n');

    const sementicDarkTokens = dictionary.allProperties.filter((props) => {
      return props.darkValue;
    }).map((props) => {
      return `  --${props.name}: ${props.darkValue};`
    }).join('\n');

    // return `[data-theme="dark"]: {\n${darkValues}\n}`
    return `[data-theme="dark"] {\n${sementicDarkTokens}\n\n${componentTokens}\n}`
  }
})


StyleDictionary.extend(config).buildAllPlatforms();

console.log('\n🚀 Build completed!\n');
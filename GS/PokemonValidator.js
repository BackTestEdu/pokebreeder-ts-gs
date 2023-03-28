class PokemonValidator {

    constructor(pokemon){
        this.pokemon = pokemon;
    }
  
    validate(pokemon){
  
      if(pokemon.name == "Pokémon"){  SpreadsheetApp.getUi().alert('Pokemon not selected!'); throw new Error("Pokémon not selected");} 
      if(pokemon.hp == "?"){  SpreadsheetApp.getUi().alert('IV HP Not selected!'); throw new Error("IV HP Not selected!");} 
      if(pokemon.atk == "?"){  SpreadsheetApp.getUi().alert('IV ATK Not selected!'); throw new Error("IV ATK Not selected!");} 
      if(pokemon.def == "?"){  SpreadsheetApp.getUi().alert('IV DEFENSE Not selected!'); throw new Error("IV DEF Not selected!");} 
      if(pokemon.spatk == "?"){  SpreadsheetApp.getUi().alert('IV SP.ATK Not selected!'); throw new Error("IV SPATK Not selected!");} 
      if(pokemon.spdef == "?"){  SpreadsheetApp.getUi().alert('IV SP.DEFENSE Not selected!'); throw new Error("IV SP.DEF Not selected!");} 
      if(pokemon.speed == "?"){  SpreadsheetApp.getUi().alert('IV SPEED Not selected!'); throw new Error("IV SPEED Not selected!");} 
      if(pokemon.gender == "?") {  SpreadsheetApp.getUi().alert('Gender Not selected!'); throw new Error("Gender Not selected!");}
      
     } 
  
  }
  
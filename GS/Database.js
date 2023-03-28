class Database {
  
    constructor(sheet,range){
        this.sheet = sheet;
        this.range = range;
    }
    select(){
      
    }
    insert(srcsheet,range){
      let sheet = srcsheet;
      let dbsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DB - AUTOBREED");
      let i = 2;
      let emptyCell = false;
  
      while(!emptyCell){
        if("" != dbsheet.getRange("A"+i).getValue() ){ i++; }
        else{      emptyCell = !emptyCell;    }
      }
  
      
      checkingValues(stockedPoke,range,sheet,true);
      
      let pokevalues = [i,stockedPoke.name, stockedPoke.nature, stockedPoke.pegg, stockedPoke.segg, stockedPoke.hp, stockedPoke.atk, stockedPoke.def, stockedPoke.spatk, stockedPoke.spdef, stockedPoke.speed, stockedPoke.item,stockedPoke.gender,stockedPoke.alpha]
      pokevalues[0] = pokevalues[0] -1;
      
      dbsheet.getRange("A"+i+":N"+i).setValues([pokevalues]);
  
      SpreadsheetApp.getUi().alert("Dump  "+pokevalues[0]+" "+pokevalues[1]+" "+pokevalues[2]+" "+pokevalues[3]+" - Item: " +pokevalues[11]);
  
      resetPokeForm(sheet,range);
  
      SpreadsheetApp.getUi().alert('Pokemon Registered '+sheet.getActiveSpreadsheet().getSheetName());
  
    }
  }
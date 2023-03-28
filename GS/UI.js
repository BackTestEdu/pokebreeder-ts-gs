class UI {
  
    constructor(sheet,range){
        this.sheet = sheet;
        this.range = range;
    }
  
    getPokemon(){
  
      let stockedPoke = new Pokemon();
  
      stockedPoke.name = sheet.getRange("A6").getValue();
      stockedPoke.nature = sheet.getRange("A8").getValue();
      stockedPoke.pegg = sheet.getRange("A10").getValue();
      stockedPoke.segg = sheet.getRange("B10").getValue();
      stockedPoke.hp = sheet.getRange("C2").getValue();
      stockedPoke.atk = sheet.getRange("C4").getValue();
      stockedPoke.def = sheet.getRange("C6").getValue();
      stockedPoke.spatk = sheet.getRange("C8").getValue();
      stockedPoke.spdef = sheet.getRange("C10").getValue();
      stockedPoke.speed = sheet.getRange("C12").getValue();
      stockedPoke.item = "?";
      stockedPoke.gender = sheet.getRange("C14").getValue();
      stockedPoke.alpha = sheet.getRange("C15").getValue();
      
      return stockedPoke;
  
    }

    sortEggGroups(sheet){
    var eggSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DB - Pokémons");
    var homeSheet = sheet
    //I2 - L651 NAME-EGG-NAME-EGG
    //var eggP = "Monster";
    //var eggS = "Dragon";
    var cell = homeSheet.getRange("B29:B140");
    var eggP = homeSheet.getRange("F4").getValue();
    var eggS = homeSheet.getRange("G4").getValue();
    var pokelist = [];
    var eggPresult=[["Ditto"],[""]];
  
    setDefaultProcessing(homeSheet);
    
    switch(eggP){
      case "":
      eggPresult="";
      break;
      case "Genderless":
        eggPresult[1][0] = homeSheet.getRange("D3").getValue();
        homeSheet.getRange("V3:V7").setValue("");
        homeSheet.getRange("V3").setValue("?");
        homeSheet.getRange("V4").setValue("⚲");
        break;
      case "Ditto" , "No Eggs Discovered":
        homeSheet.getRange("V3:V7").setValue("");
        homeSheet.getRange("V3").setValue("Cannot Breed");
        eggPresult[0][0]= "Cannot Breed";
      break;
      default:
        var rangeValues = eggSheet.getRange("I2:L651").getValues();
  
      //Uses the method filter and creates a anonymous function then calls from row and uses the method includes
        var eggPresult = rangeValues.filter(function(row) {  return row.includes(eggP); });
        //not sorting empty secondary egg groups
        if(eggS!=""){
          var eggSresult = rangeValues.filter(function(row) {  return row.includes(eggS); });
          let sameName = false;
          for (var i = 0; i < eggSresult.length; i++){
            //new word to search so reset the flag
            sameName = false;
            //searchs for the new name trying to find a same name in the array
            for (var j = 0; j < eggPresult.length; j++){  if (eggSresult[i][0] == eggPresult[j][0]){  sameName = true;  } }
            if( !sameName ){  eggPresult.push(eggSresult[i]); }
          }
        }
        
    }
    // Hardcoding ditto
    cell = homeSheet.getRange("B29");
    cell.setValue("Ditto");
    // set the names in the sheets
    for(let i =0; i<eggPresult.length; i++){
      pokelist.push(eggPresult[i][0]);
      cell = homeSheet.getRange("B"+(i+30));
      cell.setValue(pokelist[i]);
    }
  
    }


    
   setDefaultProcessing(range,sheet){  
      switch(sheet.getSheetName()){

        case "PKM":
          range = sheet.getRange("A17"); 
          range.setValue(false);
        break;
  
        case "Breed":
          range = sheet.getRange("D3");// D3 -  Name 
          range.setValue("Pokémon");
          range = sheet.getRange("B29:B170").setValue("");// Clean EggGroups
          range = sheet.getRange("B7:G7"); // B7-G7 HP - ATK - DEF - SP.ATK - SP.DEF - SPEED 
          range.setValue("?");
          range = sheet.getRange("H7"); // H7 - Nature
          range.setValue("Whatever");
          range = sheet.getRange("B10"); //B10 - UsingEggGroups
          range.setValue(false);
          range = sheet.getRange("B13"); //B13 - UsingStock
          range.setValue(false);
          range = sheet.getRange("B16"); //B16 - Is Alpha
          range.setValue(false);
          ange = sheet.getRange("D10"); //D10 - Gender
          range.setValue("?");
          range = sheet.getRange("D13"); //D13 - PokeEggGroupName
          range.setValue("Name");
        break;
      }
    }
  
    setDefault(sheet,range){
      let cell;
  
      switch(sheet.getSheetName()){
  
      case "Breed" :
        // Gender values ? ⚲ ♂ ♀ Whatever
        cell = sheet.getRange("B29:B170").setValue(""); // Clean EggGroups
  
        //  Change gender to default 
        cell = sheet.getRange("V3");
        cell.setValue("?");
        cell = sheet.getRange("V4");
        cell.setValue("♂");
        cell = sheet.getRange("V5");
        cell.setValue("♀");
        cell = sheet.getRange("V6");
        cell.setValue("Whatever");
  
        //reseting form config
        cell = sheet.getRange("B10"); //B13 - UsingStock
        cell.setValue(false);
        cell = sheet.getRange("B13"); //B10 - UsingEggGroups
        cell.setValue(false);
        cell = sheet.getRange("G12");
        cell.setValue(false);
      break;
  
      case "PKM" :
        cell = sheet.getRange("A6");
        cell.setValue("Pokémon");
        cell = sheet.getRange("A8");
        cell.setValue("Whatever");
        cell = sheet.getRange("A14");
        cell.setValue("?");
        cell = sheet.getRange("C14");
        cell.setValue("?");
        cell = sheet.getRange("C15");
        cell.setValue(false);
        cell = sheet.getRange("A17");
        cell.setValue(false);
  
        //Reseting IV's
        cell = sheet.getRange("C2"); 
        cell.setValue("?");
        cell = sheet.getRange("C4");
        cell.setValue("?");
        cell = sheet.getRange("C6");
        cell.setValue("?");
        cell = sheet.getRange("C8");
        cell.setValue("?");
        cell = sheet.getRange("C10");
        cell.setValue("?");
        cell = sheet.getRange("C12");
        cell.setValue("?");
      break;
  
      case "Tree - Breed":
        range = sheet.getRange("A1");
        range.copyTo(sheet.getRange("A1:AB260"),{formatOnly: true, contentsOnly: true}); // Fill with ""
        sheet.clear();
        sheet.clearConditionalFormatRules();
        sheet.clearFormats();
      break;
  
  
      default:
  
      break;
      }
    }
  }
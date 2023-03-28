function onEdit(e) {
    // Get the active spreadsheet and the sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    // Get the edited range and the new value
    var range = e.range;
    var evalue = e.value;
    var dbname = new Database(sheet,range);
    let ui = new UI(sheet,range);
    // Insert Pokemon in the Sheet Database
   if (range.getRow() == 17 && range.getColumn() == 1 && sheet.getSheetName() == "PKM") { 
      let pvalidator = new PokemonValidator(ui.getPokemon(sheet,range)).validate();
      dbname.insert(sheet,range); 
   }
    // 
   if (range.getRow() == 1 && range.getColumn() == 1 && sheet.getSheetName() == "SheetTest") {var html = new HtmlGiver();  html.showHtml();}
   if (range.getRow() == 3 && range.getColumn() == 4 && sheet.getSheetName() == "Breed") { sortEggGroups(sheet,range); }
   if (range.getRow() == 12 && range.getColumn() == 7 && sheet.getSheetName() == "Breed" && sheet.getRange("G12").getValue()== true) { range = sheet.getRange("G12"); range.setValue(false); createTree(sheet,range); }
    // | 2 - 3 | 2 - 7 |
    if (range.getRow() % 7 == 0 || range.getRow() == 3 && sheet.getSheetName() == "Tree - Breed" ){   }
  }
  
  function createTree(sheet, range){
    let ui = new UI(sheet,range);
    
    // B10 = usingEgg - B13 = stock - B16 = isAlpha
    var usingEgg = sheet.getRange("B10").getValue();
    var usingStock = sheet.getRange("B13").getValue();
    var isAlpha = sheet.getRange("B16").getValue();
    var n1x31pokemons = sheet.getRange("H4").getValue();
    var pokeToBreed = new Pokemon("0tgt",sheet.getRange("D3").getValue(),sheet.getRange("H7").getValue(),sheet.getRange("F4").getValue(),sheet.getRange("G4").getValue(),sheet.getRange("B7").getValue(),sheet.getRange("C7").getValue(),sheet.getRange("D7").getValue(),sheet.getRange("E7").getValue(),sheet.getRange("F7").getValue(),sheet.getRange("G7").getValue(),"No Item",sheet.getRange("D10").getValue(),sheet.getRange("B16").getValue());
    
    pokeToBreed.log();
    checkingValues(pokeToBreed,range,sheet,false);
    ui.setDefault(sheet,"",false);
    cleanTree();
    createBranch(n1x31pokemons);
  
    var pokelistToBreed = populateBranches(n1x31pokemons,pokeToBreed);
    
    SpreadsheetApp.getUi().alert("Size pokelist after method: "+pokelistToBreed.length);
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tree - Breed");
   
  }
  
  function createBranch(n1x31pokemons){
    //var n1x31pokemons = n1x31pokemons;
    //Template2Poke is a named Range
    var templateRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange("Template2Poke");
    var destinationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tree - Breed");
    Logger.log("Last row Template - "+templateRange.getLastRow()+" - Last Column - "+templateRange.getLastColumn());
  
    if(n1x31pokemons > 1){  n1x31pokemons = n1x31pokemons/2;  }
    
    // Get the last row of the destination sheet
    var lastRow = destinationSheet.getLastRow()+1;
    
  
    for (var i = 0; n1x31pokemons > i; i++) {
      // Create a range starting from the last row plus the height of the template range times the iteration of the loop and with the same number of columns as the template range
      var destinationRange = destinationSheet.getRange(lastRow + templateRange.getHeight() * i, 1, templateRange.getHeight(), templateRange.getWidth());
      // Copy the format and data validation from the template range to the destination range
      templateRange.copyTo(destinationRange, {formatOnly: true, contentsOnly: true});
      destinationRange.setDataValidations(templateRange.getDataValidations());
    }
  }
  // TODO: Onde que isso fica?
  function populateBranches(n1x31pokemons,pokeToBreed){
   //Logger.log("Last row Template + i- "+templateRange.getLastRow()*i+" - value of: "+i+" - n31count: "+n1x31pokemons);
    // stats starts at 3 every 7 row
    let pokeToDecon = new Pokemon();
    let n1x31pokelist = [];
    pokeToDecon = pokeToBreed;
    n1x31pokemons= n1x31pokemons*2;
  
    for(i=0;5>i;i++){
      if(pokeToDecon.iv[i]==31){        
            
            switch(i){
              case 0:
              SpreadsheetApp.getUi().alert("HP "+pokeToDecon.iv[i]+" i: "+i);
              n1x31pokelist.push(new Pokemon("Created",pokeToDecon.name,"TBD",pokeToDecon.pegg,pokeToDecon.segg,31,0,0,0,0,0,"?","?",pokeToDecon.alpha)); 
              break;
              case 1:
              SpreadsheetApp.getUi().alert("ATK "+pokeToDecon.iv[i]+" i: "+i);
              n1x31pokelist.push(new Pokemon("Created",pokeToDecon.name,"TBD",pokeToDecon.pegg,pokeToDecon.segg,0,31,0,0,0,0,"?","?",pokeToDecon.alpha)); 
              break;
              case 2:
              SpreadsheetApp.getUi().alert("DEF "+pokeToDecon.iv[i]+" i: "+i);
              n1x31pokelist.push(new Pokemon("Created",pokeToDecon.name,"TBD",pokeToDecon.pegg,pokeToDecon.segg,0,0,31,0,0,0,"?","?",pokeToDecon.alpha)); 
              break;
              case 3:
              SpreadsheetApp.getUi().alert("SPATK: "+pokeToDecon.iv[i]+" i: "+i);
              n1x31pokelist.push(new Pokemon("Created",pokeToDecon.name,"TBD",pokeToDecon.pegg,pokeToDecon.segg,0,0,0,31,0,0,"?","?",pokeToDecon.alpha)); 
              break;
              case 4:
              SpreadsheetApp.getUi().alert("SPDEF: "+pokeToDecon.iv[i]+" i: "+i);
              n1x31pokelist.push(new Pokemon("Created",pokeToDecon.name,"TBD",pokeToDecon.pegg,pokeToDecon.segg,0,0,0,0,31,0,"?","?",pokeToDecon.alpha)); 
              break;
              case 5:
              SpreadsheetApp.getUi().alert("SPEED: "+pokeToDecon.iv[i]+" i: "+i);
              n1x31pokelist.push(new Pokemon("Created",pokeToDecon.name,"TBD",pokeToDecon.pegg,pokeToDecon.segg,0,0,0,0,0,31,"?","?",pokeToDecon.alpha)); 
              break;
            }
  
         }
    }
  
  
  //2 - nat 1x31A + 1x31SPE + 0x31N + 1x31A
  //3 - nat - Nature - 3(1x31+1x31 + 1x31+1x31) + N - (1x31+1x31) + N - 1x31 + N
  //4 - nat (1x31 + 0x31N) + (1x31+1x31)
  //3 - not  1x31S + 1x31A + 1x31A + 1x31H
  
  // With nature every stats need another copy to be pasted to the nature poke.
  // I will copy the latest value in the chain
  //4 - not (1x31HP + 1x31DEF) + (1x31HP + 1x31SPDEF) - 3x31[HP,DEF,SPDEF] 
  //4 - not (1x31HP + 1x31DEF) + (1x31HP + 1x31ATK)  - 3x31[ATK,HP,DEF] 
  
  
  SpreadsheetApp.getUi().alert("End Method "+n1x31pokelist.length);
  
    switch(n1x31pokelist.length){
  
      //Should advice the user
      case 1:
      if(pokeToDecon.nature=="Whatever"){
        n1x31pokelist.push(new Pokemon().setToDefault());
      }
  
      n1x31pokelist.push(new Pokemon());
      n1x31pokelist[1].setToDefault();
      n1x31pokelist[1].nature = pokeToDecon.nature;
      n1x31pokelist[1].item = "Everstone";
      n1x31pokelist[1].name = pokeToDecon.name;
      n1x31pokelist[1].gender = pokeToDecon.gender;
  
      
      n1x31pokelist[0].nature = "Whatever";
      n1x31pokelist[0].gender = pokeToDecon.invertGender();
      n1x31pokelist[0].name = pokeToDecon.name;
      //SpreadsheetApp.getUi().alert("End Method");
      return n1x31pokelist;
      break;
  
      case 2:
      if(pokeToDecon.nature=="Whatever"){
        n1x31pokelist.push(new Pokemon());
      }
      break;
      case 3:
      //after 3 i start to multiply one stat
      
  
      break;
      case 4:
      break;
      case 5:
      break;
      case 6:
      break;
    }
    
    
  
  }
  
  function sortEggGroups(sheet,range){
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
  
    ui.setDefaultProcessing(homeSheet);
    
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
  
  
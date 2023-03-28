class Pokemon {
    // Constructor function
    constructor(sid = "Created" ,name = "", nature = "TBD", pegg = "", segg = "", hp = "?", atk = "?", def = "?", spatk = "?", spdef = "?", speed = "?", item = "?", gender = "?",alpha = "") {
      this.sid = sid;
      this.name = name;
      this.nature = nature;
      this.pegg = pegg;
      this.segg = segg;
      this.hp = hp;
      this.atk = atk;
      this.def = def;
      this.spatk = spatk;
      this.spdef = spdef;
      this.speed = speed;
      this.item = item;
      this.gender = gender;
      this.alpha = alpha;
      this.iv = [this.hp,this.atk,this.def,this.spatk,this.spdef,this.speed];
    }
    get iv(){
      return [this.hp, this.atk, this.def, this.spatk, this.spdef, this.speed];
    }
  
    set iv(newIV){
       try {
      this.iv = newIV;
    } catch (e) {
      console.error(e);
    }
    }
    
    // Method to greet the object
    log() {
     Logger.log("SID: "+this.sid+" | Pokemon: " + this.name + " | Its alpha? : " + this.alpha + " | Egg groups: " + this.pegg + " - " + this.segg + " | Gender: " + this.gender + " | Nature: " + this.nature + " | HP: " + this.hp + " | Attack: " + this.atk + " | Defense: " + this.def + " | Special Attack: " + this.spatk + " | Special Defense: " + this.spdef + " | Speed: " + this.speed + " | Breed Item: " + this.item);
    }
  
    invertGender(){
      switch(this.gender){
        case "♀": 
         return "♂" ;
         break;
        case "♂": 
         return "♀" ;
         break;
      default:
          return this.gender;
      }
    }
    setToDefault(){
    this.sid = "Created";
    this.nature = "Whatever";
    this.hp = 0;
    this.atk = 0;
    this.def = 0;
    this.spatk = 0;
    this.spdef = 0;
    this.speed = 0;
    
  }
  
  
  
  
  }
  
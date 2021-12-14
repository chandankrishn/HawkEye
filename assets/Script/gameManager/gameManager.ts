import { sys } from "cc";

export class gameManager {

    private static _instance:gameManager = new gameManager();

  
    private _currentlife=0;
    private _currentScore=0;
    
    constructor() {
        if(gameManager._instance){
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        gameManager._instance = this;
    }
    public setCurrentlife(value:any):void
    {
        this._currentlife=value;
    }
    public getCurrentlife():any
    {
        return this._currentlife;
    }
    public setCurrentScore(value:any):void
    {
        this._currentScore=value;
    }
    public getCurrentScore():any
    {
        return this._currentScore;
    }
  
   
}

 
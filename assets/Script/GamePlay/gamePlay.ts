
import { _decorator, Component, Node, systemEvent, SystemEvent, macro, SystemEventType, CCFloat, Vec3, EventMouse, Prefab } from 'cc';
import { HawkMove } from '../hawk/hawkMove';
const { ccclass, property } = _decorator;
import { ACTION } from '../Utility/Constants';
import { getScript } from '../Common/Utility';

/**
 * Predefined variables
 * Name = GamePlay
 * DateTime = Fri Dec 10 2021 14:50:44 GMT+0530 (India Standard Time)
 * Author = chandanKrishnani
 * FileBasename = gamePlay.ts
 * FileBasenameNoExtension = gamePlay
 * URL = db://assets/Script/GamePlay/gamePlay.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('GamePlay')
export class GamePlay extends Component 
{
    @property({type: CCFloat})
    public moveNumber: number = 50;

    @property({type : CCFloat})
    public moveTime : number = 0.4;

    @property({type : Prefab})
    public snailPrefab : Prefab = null;

    @property({type : Prefab})
    public HawkPrefab : Prefab = null;
    

    private startJump: boolean = false;
    private jumpStep: number = 0;
    private curJumpTime: number = 0;
    // private moveTime: number = 0.4;
    private curSpeed: number = 0;
    private curPos: Vec3 = new Vec3();
    private deltaPos: Vec3 = new Vec3(0, 0, 0);
    private targetPos: Vec3 = new Vec3();
    private isMoving = false;

    start () 
    { 
        systemEvent.on(SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        systemEvent.on(SystemEvent.EventType.KEY_UP,this.onKeyDown,this);  
    }

    onKeyDown(event: any) 
    {
        switch(event.keyCode) 
        { 
            case macro.KEY.left:    
                this.doAction(ACTION.Backward);
                break;
            case macro.KEY.right:
                this.doAction(ACTION.Forward);
                break;
        }

    }
    instantiateNeccessoryNodes()
    {
        
        
    }


    doAction(step: ACTION) 
    {
        if(this.isMoving) 
            return;

        if(step == ACTION.Forward)
            this.jumpStep = this.moveNumber;
        else if(step == ACTION.Backward)
            this.jumpStep = -this.moveNumber;    
        this.startJump = true;
        this.curJumpTime = 0;
        this.curSpeed = this.jumpStep / this.moveTime;
        this.node.getPosition(this.curPos);
        Vec3.add(this.targetPos, this.curPos, new Vec3(this.jumpStep, 0, 0));
        this.isMoving = true;
        
    }

    onOnceJumpEnd() {
        this.isMoving = false;
    }

    update (deltaTime: number) {
        if (this.startJump) {
            this.curJumpTime += deltaTime;
            if (this.curJumpTime > this.moveTime) {
                // end
                this.node.setPosition(this.targetPos);
                this.startJump = false;
                this.onOnceJumpEnd();
            } else {
                // tween
                this.node.getPosition(this.curPos);
                this.deltaPos.x = this.curSpeed * deltaTime;
                Vec3.add(this.curPos, this.curPos, this.deltaPos);
                this.node.setPosition(this.curPos);
            }
        }
    }
}
/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */

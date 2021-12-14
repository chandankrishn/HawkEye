
import { _decorator, Component, Node, Vec3, UITransform, PostprocessStage, CCFloat } from 'cc';
const { ccclass, property } = _decorator;
import { nodeWidth,nodeHeight,getXposition,getYposition  } from '../Common/Utility';


/**
 * Predefined variables
 * Name = HawkMove
 * DateTime = Mon Dec 13 2021 15:22:21 GMT+0530 (India Standard Time)
 * Author = chandanKrishnani
 * FileBasename = hawkMove.ts
 * FileBasenameNoExtension = hawkMove
 * URL = db://assets/Script/hawk/hawkMove.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('HawkMove')
export class HawkMove extends Component 
{
    @property( Node )
    camera : Node = null;
    
    @property({ type : CCFloat })
    public moveSpeed : number = 0.99;

    currentSpeed : number = 0;
    targetHawkPos : Vec3 = new Vec3();
    hawkMovement : boolean = false;

    start () 
    {
        this.targetHawkPos=this.node.position;
       
    }
    initateHawk()
    {
        if(!this.hawkMovement)
            this.launchHawk();
    }
    launchHawk()
    {
            this.currentSpeed  = this.moveSpeed;
            let setPosX : number = getXposition(this.camera) - nodeWidth(this.node.parent);
            this.node.setPosition(setPosX,getYposition(this.node),1);
            this.targetHawkPos = new Vec3(getXposition(this.camera) + nodeWidth(this.node.parent) + nodeWidth(this.node), getYposition(this.node),1);
            this.hawkMovement=true;
        
    }

     update (deltaTime: number) {
         if(this.hawkMovement && Math.ceil(this.node.position.x) != Math.ceil(this.targetHawkPos.x))
         {
             let currentPos : any = this.node.position;
            let setpos : Vec3  = new Vec3();
            Vec3.lerp(setpos,this.targetHawkPos,currentPos,this.currentSpeed);
            this.node.setPosition(setpos);
            this.currentSpeed=this.currentSpeed-0.0005;
         }  
         else
         {
             this.hawkMovement=false;
           
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

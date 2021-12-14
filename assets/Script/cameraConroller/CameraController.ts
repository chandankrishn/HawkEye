
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CameraController
 * DateTime = Mon Dec 13 2021 12:31:50 GMT+0530 (India Standard Time)
 * Author = chandanKrishnani
 * FileBasename = CameraController.ts
 * FileBasenameNoExtension = CameraController
 * URL = db://assets/Script/cameraConroller/CameraController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */



@ccclass('CameraController')
export class CameraController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    snail : Node;

    start () {
        // [3]
    }

    update (deltaTime: number) {
            let targetPos : any = this.snail.position;
            let currentPos : any = this.node.position;
            let setpos : Vec3  = new Vec3();
            Vec3.lerp(setpos,targetPos,currentPos,0.1);
            if(this.node.position.x != setpos.x && setpos.x > 0 && setpos.x < 4560)
            {
                this.node.setPosition(setpos.x,setpos.y,10);
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

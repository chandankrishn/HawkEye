
import { _decorator, Component, Node, tween, Vec3, Prefab, instantiate, UITransform, UI } from 'cc';
const { ccclass, property } = _decorator;

export function popOpen(item : Node, duration : number)
{
    tween(item)
    .to(duration, { scale : new Vec3(1,1,1) })
    .start();
}


export function popClose(item : Node, duration : number)
{
    tween(item)
    .to(duration, { scale : new Vec3(0,0,0) })
    .start();
}
export function nodeWidth(item : Node)
{
    var width : number = item.getComponent(UITransform).width/2;
    return width;
}
export function nodeHeight(item : Node)
{
    var height : number = item.getComponent(UITransform).height/2;
    return height;
}
export function getXposition(item : Node)
{ 
    return item.position.x;
}
export function getYposition(item : Node)
{
    
    return item.position.y;
}
export function getScript(item : Node , script : string)
{
    if(script)
    {
        var compScript : Component;
        compScript = item.getComponent(script);
        return compScript;  
    }

}

export class MyNode
{
    myNode : Node;
    myScript : Component;
    constructor(prefab : Prefab, script : string, parent : Node)
    {
        this.myNode=instantiate(prefab);
        if(script)
            this.myScript = this.myNode.getComponent(script);
        if(parent)
            parent.addChild(this.myNode);
    }

}
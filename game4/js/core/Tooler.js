let Tooler = {};

Tooler.sum = function(n){
    if(n == 0){
        return 0;
    }
    return n + Tooler.sum(n - 1);
}

Tooler.getRotation = function(position){
    var up = new THREE.Vector3(0, 1, 0);

    //法線ベクトルを取得。サンプルではinput要素から取得。
    var normalAxis = new THREE.Vector3(position.x, position.y, position.z).normalize();

    //回転軸用のベクトルを生成
    var dir = new THREE.Vector3();

    //「上」方向と法線ベクトルとの外積を計算。正規化。
    dir.crossVectors(up, normalAxis).normalize();

    //上記ベクトルとの内積（cosθ）
    var dot = up.dot(normalAxis);// / (up.length() * normalAxis.length());

    //acos関数を使ってラジアンに変換。
    var rad = Math.acos(dot);

    return rad;
}

export default Tooler;
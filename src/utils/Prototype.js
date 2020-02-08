


String.prototype.toInt = function(){
    if (typeof this[0] ===  "string") {
        return Number(this);
    }
};

String.prototype.isEmpty = function(){
    return this.length === 0;
};
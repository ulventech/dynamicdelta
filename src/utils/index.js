    function formatText(text){
        let newStr = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        newStr = newStr.replace(expression, "<a href='$1'>$1</a>")
        newStr = newStr.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") 
        newStr = newStr.replace(/~~(.*?)~~/g, "<i>$1</i>") 
        return newStr;
    }

    export {formatText};

    

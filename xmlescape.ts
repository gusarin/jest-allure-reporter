import strip_ansi = require("strip-ansi");

export function escapeXml(str: string, ignore: any) {
    const map = {
        '>': '&gt;'
        , '<': '&lt;'
        , "'": '&apos;'
        , '"': '&quot;'
        , '&': '&amp;'

    };

    let pattern;

    if (str === null || str === undefined) return;

    ignore = (ignore || '').replace(/[^&"<>\']/g, '');
    pattern = '([&"<>\'])'.replace(new RegExp('[' + ignore + ']', 'g'), '');
   
    //Remove Colloring from Results, to avoid failures in Allure
    var strSplit: string = str;
    str = "";

    //Handle line regarding coloring/content, to avoid unwanted replacements
    strSplit.split("\n").forEach(line => {
        if(line.startsWith("Error",0)){
            line = strip_ansi(line);
            line = line.replace(/\u001b/g, "");
            line = line.replace(/\u005b/g, "");
            line = line.replace(/\u0032/g, "");
            line = line.replace(/\u006d/g, "");
            
            line = line.replace(/\u0031/g, "");
            line = line.replace(/\u0039/g, "");
            line = line.replace(/\u0033/g, "");  
        }
        else{
            line = strip_ansi(line);
        }
        str += line + "\n";
    });


    return str.replace(new RegExp(pattern, 'g'), function (str, item) {
        return map[item];
    })
}

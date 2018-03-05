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
    if(!(str.toString().startsWith('    at'))){
        str = str.replace(/\u001b/g, "");
        str = str.replace(/\u005b/g, "");
        str = str.replace(/\u0032/g, "");
        str = str.replace(/\u006d/g, "");
        
        str = str.replace(/\u0031/g, "");
        str = str.replace(/\u0039/g, "");
        str = str.replace(/\u0033/g, "");  
    } 


    return str.replace(new RegExp(pattern, 'g'), function (str, item) {
        return map[item];
    })
}

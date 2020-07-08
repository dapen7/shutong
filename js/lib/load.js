function load(url,comName){
    var xhr = new XMLHttpRequest();
    xhr.open('get',url,true);
    xhr.onreadystatechange = function(data){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var fragment = document.createDocumentFragment();
            let div=document.createElement('div');
            div.innerHTML=xhr.responseText;
            Array.from(div.children).forEach(function(item){
                switch (item.nodeName) {
                    case "STYLE":
                        fragment.appendChild(item);
                        break;
                    case "TEMPLATE":
                        var origin = document.querySelector(comName);
                        var children = origin.children;
                        var fragmentTmp = document.createDocumentFragment();
                        Array.from(children).forEach(function(child){
                            fragmentTmp.appendChild(child);
                        });
                        item.content.querySelector("slot") && item.content.querySelector("slot").replaceWith(fragmentTmp);
                        
                        Array.from(origin.classList).forEach(function(classItem){
                            item.content.children[0].classList.add(classItem)
                        });
                        item.content.children[0].setAttribute("style", (item.content.children[0].getAttribute("style")||"")+ origin.getAttribute("style"));
                        origin.replaceWith(item.content);
                        break;
                    case "SCRIPT":
                        var script = document.body.appendChild(document.createElement('script'));
                        script.text = item.text;
                        break;
                    default:
                        break;
                }

                if(item){

                }
                
            })
            document.body.appendChild(fragment);
        }
    }
    xhr.send(null);
}
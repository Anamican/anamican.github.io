
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/site/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/site/about",
    "title": "About",
    "body": "I'm Madhukumaar T R and this is my personal blog. I write about things I like, things that I wish to share with the world.  You can find me on LinkedIn "
    }, {
    "id": 2,
    "url": "http://localhost:4000/site/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/site/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                           What's holding you back is not You but You                              :               I know the title seems confusing, but hear me out:                                                                       23 May 2019                &lt;/span&gt;                                                                                                                                                                                                                                                                                                  My First Post                              :               This blog started as a result of dream I had. In the dream a close friend of mine says, “Something is written on your forehead”. . . . :                                                                       22 May 2019                &lt;/span&gt;                                                                                                      All Stories:                                                                                                     What's holding you back is not You but You              :       I know the title seems confusing, but hear me out:                               23 May 2019        &lt;/span&gt;                                                                                                                             My First Post              :       This blog started as a result of dream I had. In the dream a close friend of mine says, “Something is written on your forehead”. :                               22 May 2019        &lt;/span&gt;                                    "
    }, {
    "id": 4,
    "url": "http://localhost:4000/site/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/site/whats-holding-you-back-is-not-you-but-you/",
    "title": "What's holding you back is not You but You",
    "body": "2019/05/23 - I know the title seems confusing, but hear me out Everyday we wake up, do some chores, get dressed, start to work or do whatever we feel like. This basic feeling of Self is something that is ingrained in us. We look at the world as how we want the world to be and not as it is. And because of Self imposition on the world, we fail to understand the underlying facts and figures about the world. The question is not about whether we can change our view on the world or not. It’s about whether we accept the facts as it is and move on to do what we destined to do in this world. Destiny is whole other debatable topic in itself, I’m not gonna get into the details of it in this post. I know the feeling of consuming a lot of self-help content. I get it, it makes you feel good. Hell, it makes you feel like you are on the top of Mount Everest screaming your lungs out. But the reality is, you just keep on consuming and consuming and run around in the same circle once you used to be. And ultimately you become a Self Improvement Junkie  Self Improvement Junkie is a person who keeps on consuming Personal Development Content and fails to take action The feel-good nature of good content, makes us addicted to it, more like chained to it. What can you do to improve?: Take Action: I hear ya, everyone says the same thing, from Tony Robbins to Tim Ferris. But taking action is hard, really, really hard. Or is it? This is the Self imposition I am talking about. Whether it is hard or not it depends on us. Is that all that you are trying to say?: No. Absolutely not. I don’t wanna list out somethings that you can do to improve yourself. I’m just gonna tell you one thing. Take a deep breath and do it. That’s it. Whatever you are trying to do, that article you were trying to write once, that program you were smashing your brain on, that laundry that you were about do today, whatever it is, just Take a deep breath and do it. I’m gonna stop right here and let you make your move. "
    }, {
    "id": 6,
    "url": "http://localhost:4000/site/my-first-post/",
    "title": "My First Post",
    "body": "2019/05/22 - This blog started as a result of dream I had. In the dream a close friend of mine says, “Something is written on your forehead”. It was written எழுதப்பழகு a combinations of two words in Tamil.  It is said that all words in a particular language cannot be translated into other without losing a part of the meaning. So the closest translation I can offer you is Make Writing a Habit I neither have any idea of what this all means nor I’m aware of where this path will take me. All that I’m willing to do, is give writing a try … "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});
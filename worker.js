"addEventListener("fetch", event => {
  event.respondWith(fetchAndReplace(event.request))
})

async function fetchAndReplace(request) {

  let modifiedHeaders = new Headers()

  modifiedHeaders.set('Content-Type', 'text/html; charset=UTF-8')
  modifiedHeaders.append('Pragma', 'no-cache')

  //Retourner la page de maintenance si vous n'appelez pas à partir d'une IP de confiance
  if (request.headers.get("cf-connecting-ip") !== "41.231.3.144") 
  {
    // Retourner la réponse modifiée avec le statut HTTP 503.
    return new Response(maintPage, {
      headers: modifiedHeaders,
      status: 503
    })
  }
  else //Permettre aux utilisateurs de confiance d'accéder au site
  {
    //Envoyer toutes les autres requêtes directement à nos serveurs Web
    return fetch(request)
  }
}

let maintPage = 
<!doctype html>
<title>Maintenance du Site</title>
<style>
  body { 
        text-align: center; 
        padding: 150px; 
        background: url('data:image/jpeg;base64,<base64EncodedImage>'); 
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
      }

    .content {
        background-color: rgba(255, 255, 255, 0.75); 
        background-size: 100%;      
        color: inherit;
        padding-top: 1px;
        padding-bottom: 10px;
        padding-left: 100px;
        padding-right: 100px;
        border-radius: 15px;        
    }

  h1 { font-size: 40pt;}
  body { font: 20px Helvetica, sans-serif; color: #333; }
  article { display: block; text-align: left; width: 75%; margin: 0 auto; }
  a:hover { color: #333; text-decoration: none; }  


</style>

<article>

        <div class="background">
            <div class="content">
        <h1>Nous serons de retour bientôt!</h1>        
            <p>Nous sommes désolés pour le désagrément, mais nous effectuons une maintenance. Veuillez revenir bientôt...</p>
            <p>&mdash; <B><font color="red">{</font></B>Équipe AROBAZ<B><font color="red">}</font></B></p>
            <p>Contactez-nous à : <a href="mailto:contact@arobaz.tn">contact@arobaz.tn</a></p>
        </div>
    </div>

</article>
;"

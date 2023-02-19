<script>
  import FirebaseApp from "$lib/FirebaseApp.svelte";
  
  const credentials = { apiKey: "AIzaSyAfsphxEVoOlH_XuS7KAhlLhpcDsodeHJI",authDomain: "test-64eea.firebaseapp.com",projectId: "test-64eea", storageBucket: "test-64eea.appspot.com",messagingSenderId: "122960374039",appId: "1:122960374039:web:13b8922c43d143a7b66f52",measurementId: "G-36G2TFRZS4"}
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
</svelte:head>

<FirebaseApp {credentials}>
  <div class="container" style="padding: 4rem 1rem;">
    <slot/>
  </div>
</FirebaseApp>
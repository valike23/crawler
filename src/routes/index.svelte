<script lang="ts">
  import axios from 'axios';
	let url: any = "";
	let raw: any = "";
	const crawl = async (url) => {
	  let data = await axios.get(url);
	  console.log('data2', data);
		raw =  data.data;
	  console.log(raw);
	};
  </script>
  
  <svelte:head>
	<title>Telnet Crawler</title>
  </svelte:head>
  
  <h1>Welcome</h1>
  <div class="container">
	<form
	  on:submit|preventDefault={() => {
  
		crawl(url);
	  }}
	>
	  <div class="mb-3">
		<label for="exampleInputEmail1" class="form-label">Website</label>
		<input
		  required
		  type="url"
		  bind:value={url}
		  class="form-control"
		 
		  aria-describedby="emailHelp"
		/>
		<div id="emailHelp" class="form-text">
		  Enter Website URL you want to crawl
		</div>
	  </div>
  
	  <button type="submit" class="btn btn-primary">Crawl</button>
	</form>
  
	<div>
		<br><br>
	  <h3>Raw Content</h3>
	  <p>{raw}</p>
	</div>
  </div>
  
  <style>
	h1,
	
	p {
	  text-align: center;
	  margin: 0 auto;
	}
  
	h1 {
	  font-size: 2.8em;
	  text-transform: uppercase;
	  font-weight: 700;
	  margin: 0 0 0.5em 0;
	}
  
	
  
	p {
	  margin: 1em auto;
	}
  
	@media (min-width: 480px) {
	  h1 {
		font-size: 4em;
	  }
	}
  </style>
  
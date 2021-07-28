<script lang="ts">
  import axios from 'axios';
import { onMount } from 'svelte';
	let url: any = "";
	let raw:string;
	let win: Window;
	let logo: string;
	onMount(()=>{
		win = window;
	})
	const crawl = async (url) => {
	  let data = await axios.get(`api/crawl?id=${url}`);
		raw =  data.data;
		let content: Array<string> = [];
		let test: string = JSON.parse(raw);
		raw = test;
		try {
		let testArray = test.split('</head>');
		// testArray.forEach((e,i)=>{
		// 	//console.log(e)
		//   if(e.search('.png') > 0){
		// 	content.push(e);
		//   }
		// })
		let workableString = testArray[0];
		testArray = workableString.split('<head>');

		let head =	win.document.createElement('head');
			head.innerHTML = testArray[1];
			let allLinks =head.querySelectorAll('link');
			let tempLinks =  [];
			allLinks.forEach((e,i)=>{
				if(e.href && e.rel== "icon")tempLinks.push(e.href);
				
			})
			let linkWithImages = "";
			tempLinks.forEach((e: string, i)=>{
				 linkWithImages = e
			
			})
			logo = cleanImageUrl(url,linkWithImages);
		} 
		
		
		
		catch (error) {
			
		}
		
	 
	};
	let cleanImageUrl = (url: string, image: string) =>{
		
		console.log(image);
		let test = image.split('/');
		if(test[2] == location.host){
			let urlTest = url.split('/');
			let result = urlTest[0] + "//" + urlTest[2];

			console.log(test);
			test.forEach((e,i)=>{
				console.log(e,i)
				if(i > 2){
					result += '/' + e;
				}
			})
			return result;
		}
		console.log(test)
		if(image.startsWith('http')) return image;
		

		return "https://funforspanishteachers.com/wp-content/uploads/2018/05/blog.jpg";
	}
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
		<h3>Logo</h3>
		<img src="{logo}" alt="logo">
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
  
import React from "react";

function Home(){
   return(
     <div>
        <section className="todohome">
			<header>
				<h1>todos</h1>
			</header>
			<section>
				<h2>todos helps you get things done</h2>
				<a className="button" href="/login">Sign in</a>
			</section>
		</section>
		<footer className="info">
			<p>Created by <a href="https://www.jaredhanson.me">Jared Hanson</a></p>
			<p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
			<p>Authentication powered by <a href="https://www.passportjs.org">Passport</a></p>
		</footer>
     </div>
   );
}

export default Home;
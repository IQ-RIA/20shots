<div class="navbar navbar-fixed-top">
	<div class="navbar-inner">
    	<div class="container">
      		<a class="brand" href="#">Listen music, collect fans, became popular</a>
      		<a class="logout" href="/logout">Log out</a>
    	</div>
  	</div>
</div>

<div class="root">
	<div class="left-col no-scroll" id="dj-list-placeholder">
	</div>

	<div class="right-col text-center">
		<span>Playlist name: <a href="#">Playlist #1</a></span>
	</div>
	<div class="middle-col">
		<div style="margin: 0px 10px">
			<div class="title">
				<h4>DJ Some Cool Man is playing</h4>
				<h5>Karen Overton – Your Loving Arms (Club Mix)</h5>
				<video style="display:none" id="player" name="media"></video>
			</div>

			<input type="button" value="Play" class="btn" id="play-btn" />
		</div>
		<div class="controls" style="margin: 40px 10px 0px 10px">
		  	<a href="#" style="float:right;padding-top:6px">Show song titles</a>
		  	<div class="input-prepend">
		  		<span class="add-on"><i class="icon-search"></i></span>
		    	<input type="text" id="search-val" class="span8 ">
		  	</div>
		</div> 

		<div class="scrollable" id="song-list" style="top:140px">
		</div>
	</div>
</div>
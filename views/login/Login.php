<?php require 'views/includes/Header.php'; ?>

<h1>Welcome - Login</h1>
<p class="hint"><?php if(isset($this->msg)) echo $this->msg ?></p>
<form action="<?php echo BASE_URL ?>login/run" method="post">
    <label for="username">Username</label>
    <input id="username" name="username" type="text" value="" placeholder="Username">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" value="" placeholder="Password">
    <button type="submit"> Submit </button>
</form>

<?php require 'views/includes/Footer.php'; ?>

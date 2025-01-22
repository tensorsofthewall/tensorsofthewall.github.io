{pkgs, ...}:

# devenv.nix for personal website (tensorsofthewall.github.io)

{
    env.GREET ="First time? Welcome to Nix, you're gonna have a (fun?) time. ";

    env.PATH = [
        "$PATH"
    ];

    # Enable NodeJS
    languages.javascript = {
        enable = true;
        package = pkgs.nodejs-18_x;
    };

    # Project dependencies
    packages = with pkgs; [
        yarn
        pnpm
        nodePackages.typescript
    ];

    # packages = [pkgs.jq];
    # pnpm dev
    enterShell = ''
    echo $GREET
    cd ../tensorsofthewall
    '';
}
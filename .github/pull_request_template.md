# Description of changes



--------------------------------------------
### Instructions to run PR locally against a cloudigrade instance for review
To run this version of the front end against `test.cloudigra.de`, check out this branch locally and run:
```
npm install
npm run start:review
```

To run against a different instance of cloudigrade, create a file in the root
of the `frontigrade` repo named `.env.local` and within that file, set `API_HOST` to the desired cloudigrade instance.

```
cat > .env.local << 'EOL'
API_HOST=http://your_url_here
EOL
```

Then run `npm run start:review`. 

**NOTE:** Any time you want to change `API_HOST`, you must `ctl-c` out of `npm run start:review` and then restart it.

In either case, to create a regular user and begin your review, you can use `httpie` (pip or dnf installable) with the following command.

```
http POST $API_HOST/auth/users/create/ username=your_username@example.com password=$CHANGE_ME email=your_username@example.com
```

cd /root/src/andyxu.xyz/
git pull

cd /root/src/andyxu.xyz/cal/generator
chmod +x ./gen-from-google-cal
./gen-from-google-cal
mv *.md ../

cd /root/src/andyxu.xyz/
git add .
git commit -m "updated schedule"
git push

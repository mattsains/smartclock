sudo apt-get install libcairo2-dev
sudo apt-get install libpango1.0-dev
sudo apt-get install libjpeg-dev

npm install

sudo cat boot/cmdline.txt >> /boot/cmdline.txt
sudo cat etc/rc.local >> /etc/rc.local

cd
git clone https://github.com/tasanakorn/rpi-fbcp.git
cd rpi-fbcp/
sudo apt-get install cmake
mkdir build
cd build
cmake .. && make
sudo cp fbcp /usr/bin && sudo chmod +x /usr/bin/fbcp

cd
git clone https://github.com/goodtft/LCD-show.git
cd LCD-show/
sudo cp ./usr/tft35a-overlay.dtb /boot/overlays/
sudo cp ./usr/tft35a-overlay.dtb /boot/overlays/tft35a.dtbo
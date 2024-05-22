FROM ubuntu:22.04

ENV UID=1000
ENV GID=1000
ENV DEBIAN_FRONTEND="noninteractive"
ENV USER="developer"
ENV JAVA_VERSION="8"

# install all dependencies
RUN apt-get update \
  && apt-get install --yes --no-install-recommends openjdk-$JAVA_VERSION-jdk curl unzip sed git bash xz-utils libglvnd0 ssh xauth x11-xserver-utils libpulse0 libxcomposite1 libgl1-mesa-glx sudo \
  && rm -rf /var/lib/{apt,dpkg,cache,log}

# create user
RUN groupadd --gid $GID $USER \
  && useradd -s /bin/bash --uid $UID --gid $GID -m $USER \
  && echo $USER ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USER \
  && chmod 0440 /etc/sudoers.d/$USER

USER $USER
WORKDIR /home/$USER

ENV ANDROID_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip"
ENV ANDROID_VERSION="29"
ENV ANDROID_BUILD_TOOLS_VERSION="29.0.3"
ENV ANDROID_ARCHITECTURE="x86_64"
ENV ANDROID_SDK_ROOT="/home/$USER/android"
ENV FLUTTER_CHANNEL="stable"
ENV FLUTTER_VERSION="3.22.0"
ENV FLUTTER_HOME="/home/$USER/flutter"
ENV FLUTTER_WEB_PORT="8090"
ENV FLUTTER_DEBUG_PORT="42000"
ENV FLUTTER_EMULATOR_NAME="flutter_emulator"
ENV PATH="$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/platforms:$FLUTTER_HOME/bin:$PATH"

# android sdk
RUN mkdir -p $ANDROID_SDK_ROOT
RUN mkdir -p /home/$USER/.android
RUN touch /home/$USER/.android/repositories.cfg
RUN curl -o android_tools.zip $ANDROID_TOOLS_URL
RUN unzip -qq -d "$ANDROID_SDK_ROOT" android_tools.zip
RUN rm android_tools.zip
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools/tools
RUN mv $ANDROID_SDK_ROOT/cmdline-tools/bin $ANDROID_SDK_ROOT/cmdline-tools/tools
RUN mv $ANDROID_SDK_ROOT/cmdline-tools/lib $ANDROID_SDK_ROOT/cmdline-tools/tools
RUN yes "y" | sdkmanager "build-tools;$ANDROID_BUILD_TOOLS_VERSION"
RUN yes "y" | sdkmanager "platforms;android-$ANDROID_VERSION"
RUN yes "y" | sdkmanager "platform-tools"
RUN yes "y" | sdkmanager "emulator"
RUN yes "y" | sdkmanager "system-images;android-$ANDROID_VERSION;google_apis_playstore;$ANDROID_ARCHITECTURE"

ENV FLUTTER_URL="https://storage.googleapis.com/flutter_infra_release/releases/$FLUTTER_CHANNEL/linux/flutter_linux_$FLUTTER_VERSION-$FLUTTER_CHANNEL.tar.xz"
# flutter
RUN curl -o flutter.tar.xz $FLUTTER_URL
RUN mkdir -p $FLUTTER_HOME
RUN tar xf flutter.tar.xz -C /home/$USER
RUN rm flutter.tar.xz
RUN flutter config --no-analytics
RUN flutter precache
RUN #flutter doctor --android-licenses
RUN flutter doctor
RUN flutter emulators --create
RUN flutter update-packages

COPY expensotrack_app/entrypoint.sh /usr/local/bin/
COPY expensotrack_app/chown.sh /usr/local/bin/
COPY expensotrack_app/flutter-android-emulator.sh /usr/local/bin/flutter-android-emulator
COPY expensotrack_app/flutter-web.sh /usr/local/bin/flutter-web
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
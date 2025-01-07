#!/bin/bash

# Build the web app
npm run build

# Add iOS platform
npx cap add ios

# Add Android platform
npx cap add android

# Copy web assets
npx cap copy

# Update native dependencies
npx cap sync

echo "Build complete! You can now open the projects in Xcode and Android Studio:"
echo "npx cap open ios"
echo "npx cap open android"
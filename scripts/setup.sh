#!/bin/bash

# Civisto Setup Script
# This script sets up the Civisto development environment

set -e

echo "🏛️ Setting up Civisto - AI-Driven Civic Intelligence Platform"
echo "============================================================"

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git is not installed. Please install Git first."
        exit 1
    fi
    
    echo "✅ All requirements met!"
}

# Install Supabase CLI
install_supabase_cli() {
    echo "🔧 Installing Supabase CLI..."
    
    if ! command -v supabase &> /dev/null; then
        npm install -g supabase
        echo "✅ Supabase CLI installed!"
    else
        echo "✅ Supabase CLI already installed!"
    fi
}

# Install project dependencies
install_dependencies() {
    echo "📦 Installing project dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install backend dependencies
    cd backend && npm install && cd ..
    
    echo "✅ Dependencies installed!"
}

# Setup environment variables
setup_environment() {
    echo "🔐 Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        cp .env.example .env.local
        echo "📝 Created .env.local from .env.example"
        echo "⚠️  Please edit .env.local with your actual values before continuing"
        
        # Open .env.local in default editor if available
        if command -v code &> /dev/null; then
            code .env.local
        elif command -v nano &> /dev/null; then
            nano .env.local
        else
            echo "Please edit .env.local manually with your preferred editor"
        fi
        
        read -p "Press Enter after you've configured .env.local..."
    else
        echo "✅ .env.local already exists!"
    fi
}

# Initialize Supabase project
init_supabase() {
    echo "🚀 Initializing Supabase project..."
    
    cd backend
    
    if [ ! -f supabase/config.toml ]; then
        supabase init
        
        # Copy our custom config
        cp supabase/config.toml.example supabase/config.toml 2>/dev/null || true
    fi
    
    echo "✅ Supabase project initialized!"
    cd ..
}

# Start Supabase local development
start_supabase() {
    echo "🏗️ Starting Supabase local development environment..."
    
    cd backend
    supabase start
    
    echo "✅ Supabase is running locally!"
    echo "📊 Studio URL: http://localhost:54323"
    echo "🔗 API URL: http://localhost:54321"
    cd ..
}

# Run database migrations
run_migrations() {
    echo "🗄️ Running database migrations..."
    
    cd backend
    
    # Apply migrations
    supabase db reset
    
    echo "✅ Database migrations completed!"
    cd ..
}

# Seed database with sample data
seed_database() {
    echo "🌱 Seeding database with sample data..."
    
    cd backend
    
    # Run seed file
    supabase db reset --seed
    
    echo "✅ Database seeded with sample data!"
    cd ..
}

# Deploy Edge Functions
deploy_functions() {
    echo "⚡ Deploying Edge Functions..."
    
    cd backend
    
    # Deploy all functions
    supabase functions deploy analyze-report
    supabase functions deploy gamification
    supabase functions deploy notify-municipality
    
    echo "✅ Edge Functions deployed!"
    cd ..
}

# Show final instructions
show_instructions() {
    echo ""
    echo "🎉 Civisto setup completed successfully!"
    echo "======================================"
    echo ""
    echo "🚀 To start development:"
    echo "   npm run dev"
    echo ""
    echo "📊 Supabase Studio: http://localhost:54323"
    echo "🔗 API Endpoint: http://localhost:54321"
    echo ""
    echo "📖 Next steps:"
    echo "   1. Check the API documentation: docs/api.md"
    echo "   2. Explore the sample data in Supabase Studio"
    echo "   3. Test the Edge Functions"
    echo "   4. Start building your frontend!"
    echo ""
    echo "💬 Need help? Join our Discord: https://discord.gg/civisto"
    echo "🐛 Found issues? Report them: https://github.com/johanlido/civisto/issues"
}

# Main setup flow
main() {
    check_requirements
    install_supabase_cli
    install_dependencies
    setup_environment
    init_supabase
    start_supabase
    run_migrations
    seed_database
    deploy_functions
    show_instructions
}

# Handle script interruption
trap 'echo "❌ Setup interrupted. You can run this script again to continue."; exit 1' INT

# Run main function
main

echo "✨ Happy coding with Civisto!"


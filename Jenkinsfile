pipeline {
    agent any

    environment {
        IMAGE_NAME="inovasyon-fikir-havuzu-backend"
        IMAGE_TAG="latest"
        DOCKER_HUB_REPO="tugrulhan/arge-inovasyon"
        DOCKER_HUB_CREDENTIALS="docker-hub-credentials"
    }

    stages {
        stage('Checkout Branch'){
            steps {
                checkout scm 
            }
        }

        stage('Restore'){
            steps {
                dir('28-arge-inovasyon/inovasyon-fikir-havuzu/backend/InovasyonFikirHavuzu'){
                   bat "dotnet restore"
                }
            }
        }

        stage('Docker Build'){
            steps {
                dir('28-arge-inovasyon/inovasyon-fikir-havuzu/backend'){
                    bat "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "$DOCKER_HUB_CREDENTIALS") {
                        docker.image("$DOCKER_HUB_REPO:$IMAGE_TAG").push()
                    }
                }
            }
        }
    }

    post {
        success {
            emailext (
                subject :"✅ BUILD BAŞARILI: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Tebrikler! Build başarılı oldu.\n\nDetaylar: ${env.BUILD_URL}",
                to: "tugrulhankarsli@gmail.com"
            )
        }

        failure {
            emailext(
                subject: "❌ BUILD HATALI: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body : "Build başarısız oldu!\n\nDetaylar: ${env.BUILD_URL}",
                to : "tugrulhankarsli@gmail.com"
            )
        }
    }
}

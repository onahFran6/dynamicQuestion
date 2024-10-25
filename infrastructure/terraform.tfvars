
vpc_name              = "dynamicQuestion-vpc"
cidr_block            = "10.0.0.0/16"
public_subnet_count   = 2
public_subnet_cidrs   = ["10.0.1.0/24", "10.0.2.0/24"]
availability_zones    = ["us-east-1a", "us-east-1b"]

security_group_name   = "dynamicQuestion"

security_group_name_ecs_lb = "dynamicQuestion-lb"

lb_name               = "dynamicQuestion-lb"
target_group_name     = "dynamicQuestion-tg"

family                = "dynamicQuestion-TASK"
container_definitions = [
  {
    name      = "dynamicQuestion-container",
    image     = "637423460178.dkr.ecr.us-east-1.amazonaws.com/dynamicQuestion",
    cpu       = 256,
    memory    = 512,
    essential = true,
    portMappings = [
      {
        containerPort = 3000,
        hostPort      = 3000,
        protocol      = "tcp"
      }
    ],
    environmentFiles = [
      {
        type  = "s3",
        value = "arn:aws:s3:::dynamicQuestion0178/.env"
      }
    ],
    logConfiguration = {
      logDriver = "awslogs",
      options = {
        awslogs-group         = "/ecs/",
        awslogs-create-group  = "true",
        awslogs-region        = "us-east-1",
        awslogs-stream-prefix = "ecs"
        
      }
    }
  }
]

cpu                  = "256"
memory               = "512"
execution_role_arn   = "arn:aws:iam::637423460178:role/ecsTaskExecutionRole"
task_role_arn        = "arn:aws:iam::637423460178:role/ecsTaskExecutionRole"

cluster_name         = "dynamicQuestion-ecs-app"
service_name         = "dynamicQuestion-service"
container_name       = "dynamicQuestion-container"
container_port       = 3000


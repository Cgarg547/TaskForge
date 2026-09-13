from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import (
    AuthUser,
    require_create,
    require_delete,
    require_edit,
    require_view,
)
from app.core.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate


router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("", response_model=List[TaskResponse])
def list_tasks(
    user: AuthUser = Depends(require_view),
    db: Session = Depends(get_db),
):
    tasks = db.query(Task).filter(
        Task.org_id == user.org_id
    ).all()

    return tasks


@router.post("", response_model=TaskResponse)
def create_task(
    task_data: TaskCreate,
    user: AuthUser = Depends(require_create),
    db: Session = Depends(get_db),
):
    task = Task(
        title=task_data.title,
        description=task_data.description,
        status=task_data.status,
        org_id=user.org_id,
        created_by=user.user_id,
    )

    db.add(task)

    try:
        db.commit()
        db.refresh(task)
    except Exception:
        db.rollback()
        raise

    return task


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: str,
    user: AuthUser = Depends(require_view),
    db: Session = Depends(get_db),
):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.org_id == user.org_id,
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: str,
    task_data: TaskUpdate,
    user: AuthUser = Depends(require_edit),
    db: Session = Depends(get_db),
):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.org_id == user.org_id,
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    if "title" in task_data.model_fields_set:
        task.title = task_data.title

    if "description" in task_data.model_fields_set:
        task.description = task_data.description

    if "status" in task_data.model_fields_set:
        task.status = task_data.status

    try:
        db.commit()
        db.refresh(task)
    except Exception:
        db.rollback()
        raise

    return task


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_task(
    task_id: str,
    user: AuthUser = Depends(require_delete),
    db: Session = Depends(get_db),
):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.org_id == user.org_id,
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    db.delete(task)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return None
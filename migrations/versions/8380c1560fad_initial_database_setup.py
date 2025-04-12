"""Initial database setup

Revision ID: 8380c1560fad
Revises: 
Create Date: 2025-03-31 12:20:52.539635

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8380c1560fad'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Exam_Schedules',
    sa.Column('schedule_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('exam_id', sa.Integer(), nullable=False),
    sa.Column('schedule_date', sa.Date(), nullable=False),
    sa.Column('start_time', sa.Time(), nullable=True),
    sa.Column('end_time', sa.Time(), nullable=False),
    sa.Column('venue', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['exam_id'], ['Exams.exam_id'], ),
    sa.PrimaryKeyConstraint('schedule_id')
    )
    with op.batch_alter_table('Admins', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(length=128), nullable=True))

    with op.batch_alter_table('Examiners', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(length=128), nullable=True))

    with op.batch_alter_table('Exams', schema=None) as batch_op:
        batch_op.drop_column('exam_date')
        batch_op.drop_column('end_time')
        batch_op.drop_column('start_time')

    with op.batch_alter_table('Students', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(length=128), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Students', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    with op.batch_alter_table('Exams', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.TIME(), nullable=True))
        batch_op.add_column(sa.Column('end_time', sa.TIME(), nullable=False))
        batch_op.add_column(sa.Column('exam_date', sa.DATE(), nullable=False))

    with op.batch_alter_table('Examiners', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    with op.batch_alter_table('Admins', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    op.drop_table('Exam_Schedules')
    # ### end Alembic commands ###

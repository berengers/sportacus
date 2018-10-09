"""empty message

Revision ID: 586ac0c268eb
Revises: 96332fbdac98
Create Date: 2018-10-08 16:38:54.222747

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '586ac0c268eb'
down_revision = '96332fbdac98'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('token', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('token')
    # ### end Alembic commands ###
